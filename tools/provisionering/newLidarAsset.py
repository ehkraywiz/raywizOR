with open("lidarAssetTemplate.json", "r") as templateFile:
    templateContent = templateFile.read()
    MQTTAGENTID = input("Enter the MQTT Agent ID: ")
    SENSORTOPIC = input("Enter the SensorID: ")
    VEISTREKNINGSNAVN = input("Enter the Veistrekningens Navn: ")

    #replace all occurences of the placeholders in the template content
    templateContent = templateContent.replace("%MQTTAGENTID%", MQTTAGENTID)
    templateContent = templateContent.replace("%MQTT_TOPIC_ID%", SENSORTOPIC)
    templateContent = templateContent.replace("%VEISTREKNINGSNAVN%", VEISTREKNINGSNAVN)

    with open(f"./assets/lidarAsset_{SENSORTOPIC}.json", "w") as outputFile:
        outputFile.write(templateContent)
        print(f"Created lidarAsset_{SENSORTOPIC}.json")
    