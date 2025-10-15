with open("nodeAssetTemplate.json", "r") as templateFile:
    templateContent = templateFile.read()
    MQTTAGENTID = "4A2BAZMqOrtGhYOk3pj4Sm" #input("Enter the MQTT Agent ID: ")
    SENSORTOPIC = input("Enter the Node topic ID: ")
    VEISTREKNINGSNAVN = input("Enter the Veistrekningens Navn: ")

    #replace all occurences of the placeholders in the template content
    templateContent = templateContent.replace("%MQTTAGENTID%", MQTTAGENTID)
    templateContent = templateContent.replace("%MQTT_TOPIC_ID%", SENSORTOPIC)
    templateContent = templateContent.replace("%VEISTREKNINGSNAVN%", VEISTREKNINGSNAVN)

    with open(f"./assets/nodeAsset_{VEISTREKNINGSNAVN}.json", "w") as outputFile:
        outputFile.write(templateContent)
        print(f"Created nodeAsset_{VEISTREKNINGSNAVN}.json")
    