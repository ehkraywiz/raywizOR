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
    public static final AttributeDescriptor<Double> availableStorage = new AttributeDescriptor<>("TilgjengeligLagringsplass", ValueType.NUMBER, new MetaItem<>(MetaItemType.STORE_DATA_POINTS));

}
