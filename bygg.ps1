docker compose down
docker compose down
./gradlew clean installDist
docker build -t eirikraywiz/openremote:custom ./manager/build/install/manager
docker compose up -d


