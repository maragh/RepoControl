# Github Repository Control
This project allows you to delete your public repositories from one view.

## Technology
- Bootstrap
- Vue
- Parcel
- Docker
- Github API

## Requirements
- [Github Fine-grained access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)
- Docker

## How to Start
- Copy the .env.sample file to .env.
- Add your Github Fine-grained access token to the GITHUB_TOKEN environment variable.
- Run the Docker Compose command `docker compose up`.

## References
[Github API]((https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-repositories-for-the-authenticated-user))