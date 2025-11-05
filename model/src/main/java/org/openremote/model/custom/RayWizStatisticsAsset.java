package org.openremote.model.custom;

import jakarta.persistence.Entity;
import org.openremote.model.asset.Asset;
import org.openremote.model.asset.AssetDescriptor;
import org.openremote.model.attribute.MetaItem;
import org.openremote.model.value.AttributeDescriptor;
import org.openremote.model.value.MetaItemType;
import org.openremote.model.value.ValueType;

@Entity
public class RayWizStatisticsAsset extends Asset<RayWizStatisticsAsset> {
    public static final AssetDescriptor<RayWizStatisticsAsset> statisticsAssetAssetDescriptor = new AssetDescriptor<>("eye-circle", "85a34f", RayWizStatisticsAsset.class);

    public static final AttributeDescriptor<String> test = new AttributeDescriptor<>("Hei", ValueType.TEXT, new MetaItem<>(MetaItemType.STORE_DATA_POINTS));

}
