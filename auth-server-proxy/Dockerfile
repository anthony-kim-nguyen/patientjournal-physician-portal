FROM public.ecr.aws/lambda/python:3.11

# Install your app dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy your FastAPI app
COPY . .

# Define the Lambda handler
CMD ["main.handler"]
