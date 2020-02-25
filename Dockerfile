# Stage 1 (build)
FROM node:12 as build

WORKDIR /opt/app
ADD . /opt/app

# Install dependencies
RUN yarn --frozen-lockfile

# Build storybook
RUN yarn run storybook:build

# Remove devDependencies
# Only deps that required at runtime by server bundle are kept
RUN yarn install --production --ignore-scripts --prefer-offline

# Stage 2
# start on alpine node and copy build from previous stage
FROM node:12-alpine as final
COPY --from=build /opt/app /opt/app

WORKDIR /opt/app

EXPOSE 8080

CMD ["yarn", "storybook:server"]
