param(
    [string]$tag,
    [switch]$skip
)
$env:OR_IMAGE_TAG = $null
docker compose down

if (-not $skip)
{
./gradlew clean installDist #clean for å rense cache, installDist er navnet på gradle tasken som faktisk bygger Manager.
}

if ($LASTEXITCODE -eq 0) #if build ok
{
    if($PSBoundParameters.ContainsKey("tag")) {
        $env:OR_IMAGE_TAG = $tag
        if(-not $skip){
            docker build -t eirikraywiz/openremote:$($tag) ./manager/build/install/manager # bygg docker imaget med navn openremote og tag custom FRA directory "gradle installDist" legger builden.
        }
    }
    else {
        docker build -t eirikraywiz/openremote:custom ./manager/build/install/manager
    }
    if ($LASTEXITCODE -eq 0)
    {
        docker compose up -d # start opp
    }
}
