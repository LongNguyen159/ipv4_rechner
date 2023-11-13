import ipaddress
import math

def get_ipv4_details(ip, cidr):

    network = ipaddress.IPv4Network(f"{ip}/{cidr}", strict=False)

    subnet_mask = network.netmask
    num_hosts = 2 ** (32 - int(cidr))
    num_usable_hosts = num_hosts - 2  # Subtract network and broadcast addresses
    first_host = network.network_address + 1
    last_host = network.broadcast_address - 1
    broadcast_address = network.broadcast_address

    return {
        "Subnet Mask": subnet_mask,
        "Number of Hosts": num_hosts,
        "Number of Usable Hosts": num_usable_hosts,
        "First Host Address": first_host,
        "Last Host Address": last_host,
        "Broadcast Address": broadcast_address,
    }


# Divide a network into equal subnets
def calculate_subnet_equally(ip, cidr, num_subnets):

    original_network = ipaddress.IPv4Network(f"{ip}/{cidr}")

    # Question to solve: How many network bits (1's bits) do we need to divide {ip} into {num_subnets} subnets?
    # Calculate bits to borrow by formula 2^x >= num_subnets
    # where 'x' is the number of bits to borrow.
    bits_to_borrow = math.ceil(math.log2(num_subnets))

    new_cidr = cidr + bits_to_borrow


    # Calculate subnets
    subnets = list(original_network.subnets(new_prefix=new_cidr))

    return subnets



# Divide network into unequal subnets
def calculate_subnet_unequally(ip, cidr, subnet_sizes):
    original_network = ipaddress.IPv4Network(f"{ip}/{cidr}")

    subnets = []
    current_address = original_network.network_address

    for size in subnet_sizes:
        # Calculate the number of host bits (x) required to have at least 'size' hosts in each subnet
        # using formula 2^x >= size + 2
        # +2 because network and broadcast are not assignable.
        x = math.ceil(math.log2(size + 2))

        # Calculate the new CIDR prefix for the current subnet
        subnet_cidr = 32 - x

        # Calculate the subnet
        subnet = ipaddress.IPv4Network(f"{current_address}/{subnet_cidr}", strict=False)

        # Ensure the subnet is within the original network
        if subnet.network_address >= original_network.network_address and subnet.broadcast_address <= original_network.broadcast_address:
            subnets.append(subnet)
            current_address = subnet.broadcast_address + 1

    return subnets