docker compose down
docker compose down
./gradlew clean installDist
if ($LASTEXITCODE -eq 0)
{
    docker build -t eirikraywiz/openremote:custom ./manager/build/install/manager
    if ($LASTEXITCODE -eq 0)
    {
        docker compose up -d
    }
}


