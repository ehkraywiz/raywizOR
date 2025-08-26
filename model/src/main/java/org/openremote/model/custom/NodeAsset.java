package org.openremote.model.custom;

import org.checkerframework.checker.units.qual.A;
import org.openremote.model.asset.Asset;
import org.openremote.model.asset.AssetDescriptor;
import org.openremote.model.attribute.MetaItem;
import org.openremote.model.value.AttributeDescriptor;
import org.openremote.model.value.MetaItemType;
import org.openremote.model.value.ValueDescriptor;
import org.openremote.model.value.ValueType;
import jakarta.persistence.Entity;
import org.w3c.dom.Attr;

import static org.openremote.model.Constants.*;
import java.util.Date;
import java.util.Optional;

@Entity
public class NodeAsset extends Asset<NodeAsset> {
    public static final AssetDescriptor<NodeAsset> nodeAssetAssetDescriptor = new AssetDescriptor<>("fax", "aa00aa", NodeAsset.class);

    public static final AttributeDescriptor<Date>   dateTime    = new AttributeDescriptor<>("Dato", ValueType.DATE_AND_TIME, new MetaItem<>(MetaItemType.STORE_DATA_POINTS), new MetaItem<>(MetaItemType.ACCESS_RESTRICTED_WRITE));
    public static final AttributeDescriptor<String> hardwareID = new AttributeDescriptor<>("MaskinvareID", ValueType.TEXT);
    public static final AttributeDescriptor<Double> latitude = new AttributeDescriptor<>("Breddegrad", ValueType.NUMBER);
    public static final AttributeDescriptor<Double> longitude = new AttributeDescriptor<>("Lengdegrad", ValueType.NUMBER);
    public static final AttributeDescriptor<Double> azimuth = new AttributeDescriptor<>("Azimut",ValueType.NUMBER);
    public static final AttributeDescriptor<Double> cpuUtilization = new AttributeDescriptor<>("CPUBelastning", ValueType.NUMBER, new MetaItem<>(MetaItemType.STORE_DATA_POINTS));
    public static final AttributeDescriptor<Integer> availableMemory = new AttributeDescriptor<>("TilgjengeligMinne", ValueType.POSITIVE_INTEGER, new MetaItem<>(MetaItemType.STORE_DATA_POINTS));
    public static final AttributeDescriptor<Integer> availableStorage = new AttributeDescriptor<>("TilgjengeligLagringsplass", ValueType.POSITIVE_INTEGER, new MetaItem<>(MetaItemType.STORE_DATA_POINTS));


    /*
    public static final AttributeDescriptor<String> vendor = new AttributeDescriptor<>("Leverandoer", ValueType.NUMBER);
    public static final AttributeDescriptor<String> type = new AttributeDescriptor<>("Sensortype", ValueType.TEXT);
    public static final AttributeDescriptor<String> sensor = new AttributeDescriptor<>("Sensor", ValueType.TEXT);
    public static final AttributeDescriptor<String> roadMarker = new AttributeDescriptor<>("Veistrekning", ValueType.TEXT);
    public static final AttributeDescriptor<Double> objectID = new AttributeDescriptor<>("ObjektID", ValueType.POSITIVE_NUMBER);
    public static final AttributeDescriptor<Double> velocity = new AttributeDescriptor<>("Hastighet", ValueType.NUMBER).withUnits(UNITS_KILO,UNITS_METRE,UNITS_HOUR);
    public static final AttributeDescriptor<Double> objectLength = new AttributeDescriptor<>("Objektlengde", ValueType.NUMBER).withUnits(UNITS_METRE);
    public static final AttributeDescriptor<Double> objectWidth = new AttributeDescriptor<>("Objektbredde", ValueType.NUMBER).withUnits(UNITS_METRE);
    public static final AttributeDescriptor<Double> objectHeight = new AttributeDescriptor<>("Objekthoeyde", ValueType.NUMBER).withUnits(UNITS_METRE);
    public static final AttributeDescriptor<Double> DENM = new AttributeDescriptor<>("DENM-Kode", ValueType.NUMBER);
    public static final AttributeDescriptor<String> message = new AttributeDescriptor<>("Melding", ValueType.TEXT);


    public static final AttributeDescriptor<String> roadName = new AttributeDescriptor<>("Veistrekning", ValueType.TEXT);
    public static final AttributeDescriptor<String> model = new AttributeDescriptor<>("Modell", ValueType.TEXT);
    public static final AttributeDescriptor<Double> milliVolt = new AttributeDescriptor<>("Millivolt", ValueType.NUMBER).withUnits(UNITS_MILLI, UNITS_VOLT);
    public static final AttributeDescriptor<Double> temperature = new AttributeDescriptor<>("Temperatur", ValueType.NUMBER).withUnits(UNITS_CELSIUS);
    public static final AttributeDescriptor<Double> tilt        = new AttributeDescriptor<>("Tilt", ValueType.NUMBER).withUnits(UNITS_DEGREE);

    public static final AttributeDescriptor<String> alertSource = new AttributeDescriptor<>("Varslende_Sensor", ValueType.TEXT);
    public static final AttributeDescriptor<String> alertLevel = new AttributeDescriptor<>("Alvorlighetsgrad", ValueType.TEXT);
    public static final AttributeDescriptor<String> alertMessage = new AttributeDescriptor<>("Varselsmelding", ValueType.TEXT);
    public static final AttributeDescriptor<String> alertCode = new AttributeDescriptor<>("Varselskode", ValueType.TEXT);


    */

}
