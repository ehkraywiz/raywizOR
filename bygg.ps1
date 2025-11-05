docker compose down
docker compose down # Stopper to ganger for å garantere at det er nede

./gradlew clean installDist #clean for å rense cache, installDist er navnet på gradle tasken som faktisk bygger Manager containeren.

if ($LASTEXITCODE -eq 0) #if build ok
{
    docker build -t eirikraywiz/openremote:custom ./manager/build/install/manager # bygg docker imaget med navn openremote og tag custom FRA mappen "gradle installDist" legger builden.
    if ($LASTEXITCODE -eq 0)
    {
        docker compose up -d # start opp
    }
}


