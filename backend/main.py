from typing import Union

from fastapi import FastAPI
from models import Config
import iprechner

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/config")
async def set_config(config: Config):
    results = []

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