<!-- ABOUT THE PROJECT -->
## About The Project

The System Monitoring tool is a Python-based application that allows users to monitor their system's CPU, computer data, running processes and memory usage in real-time.

### Key features of this project:
* Real-time Monitoring: The script uses the 'psutil' library to fetch real  information. 
* Warning System: The script checks if the CPU usage or Memory usages gets over 80% and issues a warning message.
* Web Interface via Flask: The python script uses the Flask web framework to create a simple web application.

<!-- Getting Started Section -->
## Getting Started
To get started with the system monitoring, follow the steps below:
<!-- Requirements Section -->
### Requirements

- Python 
- Flask
- psutil
- Flask-Session
<!-- Installation Section -->
### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yahav123456/Python_Monitoring.git
   cd Pyhton_Monitoring_Sys
    ```

2. Install the required dependencies:

   ```bash
   pip install -r requirements.txt
    ```

### Usage

1. Run the application:
   ```bash
   python app.py
    ```

2. Open your web browser and navigate to http://localhost:5000/ to access the monitoring dashboard. (username: admin ; password: admin)

3. Monitor your system's CPU and memory usage in real-time.
    - If you are interested in loading your computer's cpu, you can do so on <a href="https://mprep.info/gpu/">this website</a>, and monitor through the application

<!-- Docker Section -->
### Docker image
1. Run this command to build a Docker image
```bash
docker build -t <your_image_name> .
```

2. To start the Flask server run this command
```bash
docker run -p 5000:5000 <image-name>
``` 

This will start the Flask server in a docker conatiner on your localhost. \
Navigate to [http://localhost:5000/](http://localhost:5000/) on your browser to access the application. \
(username: admin ; password: admin)


### Screenshots
![Screenshot](https://github.com/DorAvissar/Pyhton_Monitoring_Sys/blob/main/static/images/LOGIN.png?raw=true)

![צילום מסך 2024-06-05 093841](https://github.com/yahav123456/Python_Monitoring/assets/166650066/449c25f9-11da-4eb5-a553-ebd8e1ea5659)

![צילום מסך 2024-06-05 094001](https://github.com/yahav123456/Python_Monitoring/assets/166650066/0cd8f82d-30ae-4a55-acac-c1c17b3343d0)






