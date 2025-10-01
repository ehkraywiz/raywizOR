package org.openremote.model.custom;
import jakarta.persistence.Entity;
import org.openremote.model.asset.Asset;
import org.openremote.model.asset.AssetDescriptor;
import org.openremote.model.attribute.MetaItem;
import org.openremote.model.value.AttributeDescriptor;
import org.openremote.model.value.MetaItemType;
import org.openremote.model.value.ValueType;
import java.util.Date;
import static org.openremote.model.Constants.*;

@Entity
public class TrafficDataAsset extends Asset<TrafficDataAsset> {
    public static final AssetDescriptor<TrafficDataAsset> trafficDataAssetAssetDescriptor = new AssetDescriptor<>("car-connected", "0098fa", TrafficDataAsset.class);


    public static final AttributeDescriptor<String> leverandor = new AttributeDescriptor<>("Leverandoer", ValueType.TEXT,   new MetaItem<>(MetaItemType.AGENT_LINK), new MetaItem<>(MetaItemType.RULE_STATE));
    public static final AttributeDescriptor<String> type = new AttributeDescriptor<>("Sensortype", ValueType.TEXT,          new MetaItem<>(MetaItemType.AGENT_LINK), new MetaItem<>(MetaItemType.RULE_STATE));
    public static final AttributeDescriptor<String> sensorID = new AttributeDescriptor<>("SensorID", ValueType.TEXT,        new MetaItem<>(MetaItemType.AGENT_LINK), new MetaItem<>(MetaItemType.RULE_STATE));
    public static final AttributeDescriptor<Date> datetime = new AttributeDescriptor<>("Dato", ValueType.DATE_AND_TIME,     new MetaItem<>(MetaItemType.AGENT_LINK), new MetaItem<>(MetaItemType.RULE_STATE), new MetaItem<>(MetaItemType.STORE_DATA_POINTS));
    public static final AttributeDescriptor<Integer> objectID = new AttributeDescriptor<>("ObjektID", ValueType.INTEGER,    new MetaItem<>(MetaItemType.AGENT_LINK), new MetaItem<>(MetaItemType.RULE_STATE), new MetaItem<>(MetaItemType.STORE_DATA_POINTS));
    public static final AttributeDescriptor<String> objectClass = new AttributeDescriptor<>("Objektklasse", ValueType.TEXT, new MetaItem<>(MetaItemType.AGENT_LINK), new MetaItem<>(MetaItemType.RULE_STATE), new MetaItem<>(MetaItemType.STORE_DATA_POINTS));
    public static final AttributeDescriptor<Double> latitude = new AttributeDescriptor<>("Breddegrad", ValueType.NUMBER,    new MetaItem<>(MetaItemType.AGENT_LINK), new MetaItem<>(MetaItemType.RULE_STATE), new MetaItem<>(MetaItemType.STORE_DATA_POINTS));
    public static final AttributeDescriptor<Double> longitude = new AttributeDescriptor<>("Lengdegrad", ValueType.NUMBER,   new MetaItem<>(MetaItemType.AGENT_LINK), new MetaItem<>(MetaItemType.RULE_STATE), new MetaItem<>(MetaItemType.STORE_DATA_POINTS));
    public static final AttributeDescriptor<Double> velocity = new AttributeDescriptor<>("Hastighet", ValueType.NUMBER,     new MetaItem<>(MetaItemType.AGENT_LINK), new MetaItem<>(MetaItemType.RULE_STATE), new MetaItem<>(MetaItemType.STORE_DATA_POINTS)).withUnits(UNITS_KILO, UNITS_METRE, UNITS_HOUR);
    public static final AttributeDescriptor<Double> heading = new AttributeDescriptor<>("Retning", ValueType.NUMBER,        new MetaItem<>(MetaItemType.AGENT_LINK), new MetaItem<>(MetaItemType.RULE_STATE), new MetaItem<>(MetaItemType.STORE_DATA_POINTS));
    public static final AttributeDescriptor<Double> length = new AttributeDescriptor<>("Objektlengde", ValueType.NUMBER,    new MetaItem<>(MetaItemType.AGENT_LINK), new MetaItem<>(MetaItemType.RULE_STATE), new MetaItem<>(MetaItemType.STORE_DATA_POINTS)).withUnits(UNITS_METRE);
    public static final AttributeDescriptor<Double> height = new AttributeDescriptor<>("Objekthoeyde", ValueType.NUMBER,    new MetaItem<>(MetaItemType.AGENT_LINK), new MetaItem<>(MetaItemType.RULE_STATE), new MetaItem<>(MetaItemType.STORE_DATA_POINTS)).withUnits(UNITS_METRE);
    public static final AttributeDescriptor<Double> width = new AttributeDescriptor<>("Objektbredde", ValueType.NUMBER,     new MetaItem<>(MetaItemType.AGENT_LINK), new MetaItem<>(MetaItemType.RULE_STATE), new MetaItem<>(MetaItemType.STORE_DATA_POINTS)).withUnits(UNITS_METRE);

    public static final AttributeDescriptor<Double> DENM = new AttributeDescriptor<>("DenmKode", ValueType.NUMBER,          new MetaItem<>(MetaItemType.AGENT_LINK), new MetaItem<>(MetaItemType.RULE_STATE), new MetaItem<>(MetaItemType.STORE_DATA_POINTS));
    public static final AttributeDescriptor<String> msg = new AttributeDescriptor<>("Melding", ValueType.TEXT,              new MetaItem<>(MetaItemType.AGENT_LINK), new MetaItem<>(MetaItemType.RULE_STATE), new MetaItem<>(MetaItemType.STORE_DATA_POINTS));

    public static final AttributeDescriptor<Double> crossings = new AttributeDescriptor<>("Forbipasseringer", ValueType.NUMBER, new MetaItem<>(MetaItemType.RULE_STATE), new MetaItem<>(MetaItemType.STORE_DATA_POINTS));
    public static final AttributeDescriptor<Double> highSpeedCrossings = new AttributeDescriptor<>("HoyFart", ValueType.NUMBER, new MetaItem<>(MetaItemType.RULE_STATE), new MetaItem<>(MetaItemType.STORE_DATA_POINTS));
    public static final AttributeDescriptor<Double> lowSpeedCrossings = new AttributeDescriptor<>("LavFart", ValueType.NUMBER, new MetaItem<>(MetaItemType.RULE_STATE), new MetaItem<>(MetaItemType.STORE_DATA_POINTS));
    public static final AttributeDescriptor<Double> tallCrossings = new AttributeDescriptor<>("HoyBil", ValueType.NUMBER, new MetaItem<>(MetaItemType.RULE_STATE), new MetaItem<>(MetaItemType.STORE_DATA_POINTS));
    public static final AttributeDescriptor<Double> longCrossings = new AttributeDescriptor<>("LangBil", ValueType.NUMBER, new MetaItem<>(MetaItemType.RULE_STATE), new MetaItem<>(MetaItemType.STORE_DATA_POINTS));
    public static final AttributeDescriptor<Double> maxHeight = new AttributeDescriptor<>("MaksTillattHoeyde", ValueType.NUMBER, new MetaItem<>(MetaItemType.RULE_STATE), new MetaItem<>(MetaItemType.STORE_DATA_POINTS));


    public static final AttributeDescriptor<Double> stoppages = new AttributeDescriptor<>("AntallStopp", ValueType.NUMBER, new MetaItem<>(MetaItemType.RULE_STATE), new MetaItem<>(MetaItemType.STORE_DATA_POINTS));



    protected TrafficDataAsset() {

    }

    public TrafficDataAsset(String name) {
        super(name);
    }
}
