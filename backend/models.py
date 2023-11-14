from pydantic import BaseModel, Field
from fastapi import FastAPI


class Config(BaseModel):
    ip_address: str = Field(default='192.170.1.0')
    cidr: int = Field(default= 25)
    is_subnetting: bool = False
    is_equal: bool = True
    num_subnets: int = Field(default=4)
    subnet_sizes: list[int]