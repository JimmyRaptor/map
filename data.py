import numpy as np
import json 

# Define the base structure for the data points
base_lat = -30.79
base_lng = 121.5105
directions = [30, 60, 90]



# Generate 60 data points for each array with variation
def generate_data(base_lat, base_lng, num_points=60):
    data = []
    for i in range(num_points):
        lat = base_lat + np.random.uniform(-0.005, 0.005)  # Random latitude within a range
        lng = base_lng + np.random.uniform(-0.005, 0.005)  # Random longitude within a range
        direction = np.random.choice(directions)  # Random direction from predefined options
        data.append({'lng': lng, 'lat': lat, 'direction': direction})
    return data

# Generate two arrays of data
dataSrc1 = generate_data(base_lat, base_lng)
dataSrc2 = generate_data(base_lat, base_lng)

def convert(data):
    if isinstance(data, np.integer):
        return int(data)
    elif isinstance(data, np.floating):
        return float(data)
    elif isinstance(data, list):
        return [convert(item) for item in data]
    elif isinstance(data, dict):
        return {key: convert(value) for key, value in data.items()}
    else:
        return data

dataSrc1_converted = convert(dataSrc1)
dataSrc2_converted = convert(dataSrc2)

# 将数据保存到 JSON 文件
with open('dataSrc1.json', 'w') as file:
    json.dump(dataSrc1_converted, file, indent=4)

with open('dataSrc2.json', 'w') as file:
    json.dump(dataSrc2_converted, file, indent=4)