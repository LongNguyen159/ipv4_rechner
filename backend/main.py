from typing import Union

from fastapi import FastAPI, HTTPException
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

    try:
        # Update stored_config
        stored_config = config

        # Sort subnet_sizes array in descending order to ensure correct subnetting
        config.subnet_sizes.sort(reverse=True)

        if config.is_subnetting:
            if config.is_equal:
                print('Divide network equally')
                results = iprechner.calculate_subnet_equally(config.ip_address, config.cidr, config.num_subnets)
            elif not config.is_equal:
                print('Divide network unequally')
                results = iprechner.calculate_subnet_unequally(config.ip_address, config.cidr, config.subnet_sizes)
        elif not config.is_subnetting:
            print('Get IPv4 details')
            results = iprechner.get_ipv4_details(config.ip_address, config.cidr)

        # Return results on successful calculation
        return {"results": results}
    except Exception as e:
        # Catch ValueError during subnet calculation and return a meaningful error response
        error_message = str(e)
        raise HTTPException(status_code=400, detail=error_message)

@app.get("/stored_config")
async def get_stored_config():
    return stored_config

@app.get('/default_config')
async def get_default_config():
    return models.Config()

@app.get('/results')
async def get_results():
    return results