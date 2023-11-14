export interface Config {
    ip_address: string
    cidr: number
    is_subnetting: boolean
    is_equal: boolean
    num_subnets: number
    subnet_sizes: number[]
}