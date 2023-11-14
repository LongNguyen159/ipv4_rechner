from pydantic import BaseModel

class Config(BaseModel):
    ip_address: str
    cidr: int
    is_subnetting: bool
    is_equal: bool
    num_subnets: int
    subnet_sizes: list[int]