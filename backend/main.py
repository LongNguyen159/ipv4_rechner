from typing import Union

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import Config
import iprechner
import models

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

stored_config = {}
results = []


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/config")
async def set_config(config: Config):
    global results

    global stored_config
    stored_config = config

    if config.is_subnetting:
        if config.is_equal:
            print('divide network equally')
            results = iprechner.calculate_subnet_equally(config.ip_address, config.cidr, config.num_subnets)
        if not config.is_equal:
            print('divide not equal')
            results = iprechner.calculate_subnet_unequally(config.ip_address, config.cidr, config.subnet_sizes)
    elif not config.is_subnetting:
        results = iprechner.get_ipv4_details(config.ip_address, config.cidr)
    return results

@app.get("/stored_config")
async def get_stored_config():
    return stored_config

@app.get('/default_config')
async def get_default_config():
    return models.Config()

@app.get('/results')
async def get_results():
    return results