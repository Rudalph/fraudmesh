from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd
import numpy as np

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # allow all origins (for development)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model + feature columns
model = joblib.load("fraud_xgb_model.pkl")
feature_columns = joblib.load("feature_columns.pkl")
db = pd.read_csv("transactions_db.csv")

db["from_addr"] = db["from_addr"].astype(str).str.lower().str.strip()
db["to_addr"]   = db["to_addr"].astype(str).str.lower().str.strip()

# Request schema
class Transaction(BaseModel):
    from_addr: str
    to_addr: str
    value_wei: float
    gas: float
    gas_price: float

@app.post("/predict")
def predict(tx: Transaction):

    from_addr = tx.from_addr.lower().strip()
    to_addr = tx.to_addr.lower().strip()

    block_time = pd.Timestamp.utcnow().tz_localize(None)
    hour = block_time.hour
    day_of_week = block_time.dayofweek
    night_tx = 1 if hour < 6 else 0

    gas_fee = tx.gas * tx.gas_price
    log_value = np.log1p(tx.value_wei)

    db_from = db[db["from_addr"] == from_addr]
    db_to   = db[db["to_addr"] == to_addr]

    total_tx_from  = len(db_from)
    avg_value_from = db_from["value_wei"].mean() if total_tx_from else 0
    max_value_from = db_from["value_wei"].max()  if total_tx_from else 0
    std_value_from = db_from["value_wei"].std()  if total_tx_from else 0

    if total_tx_from:
        last_time = pd.to_datetime(db_from["block_time"], utc=True).max().tz_localize(None)
        time_diff = max((block_time - last_time).total_seconds(), 0)
    else:
        time_diff = 0

    incoming = len(db_to)
    outgoing = len(db_from)
    in_out_ratio = incoming / (outgoing + 1)

    threshold = db["value_wei"].quantile(0.95)
    high_value_flag = int(tx.value_wei > threshold)
    high_value_ratio = (db_from["value_wei"] > threshold).mean() if total_tx_from else 0

    burst_tx = 1 if time_diff < 60 else 0

    data = {
        "value_wei": tx.value_wei,
        "gas": tx.gas,
        "gas_price": tx.gas_price,
        "gas_fee": gas_fee,
        "log_value": log_value,
        "hour": hour,
        "day_of_week": day_of_week,
        "night_tx": night_tx,
        "total_tx_from": total_tx_from,
        "avg_value_from": avg_value_from,
        "max_value_from": max_value_from,
        "std_value_from": std_value_from,
        "time_diff": time_diff,
        "in_out_ratio": in_out_ratio,
        "high_value_flag": high_value_flag,
        "high_value_ratio": high_value_ratio,
        "burst_tx": burst_tx
    }

    X = pd.DataFrame([data]).reindex(columns=feature_columns, fill_value=0).fillna(0)

    prob = model.predict_proba(X)[0][1]
    pred = model.predict(X)[0]

    return {
        "fraud_probability": round(float(prob), 4),
        "prediction": "FRAUD" if pred == 1 else "LEGIT"
    }


import os

port = int(os.environ.get("PORT", 8000))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=port)
