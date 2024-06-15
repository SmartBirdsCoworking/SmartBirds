# Getting Started with TGUI Example

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### ECR

```bash
aws ecr get-login-password --region eu-central-1 | docker login --username AWS --password-stdin 211125718438.dkr.ecr.eu-central-1.amazonaws.com
docker build --platform linux/amd64 -t smartbirds-miniapp-dev .
docker tag smartbirds-miniapp-dev:latest 211125718438.dkr.ecr.eu-central-1.amazonaws.com/smartbirds-miniapp-dev:latest
docker push 211125718438.dkr.ecr.eu-central-1.amazonaws.com/smartbirds-miniapp-dev:latest
```

### Run

```commandline
docker run -p 3000:3000 211125718438.dkr.ecr.eu-central-1.amazonaws.com/smartbirds-miniapp-dev:latest
```