/*
 * Copyright 2021, OpenRemote Inc.
 *
 * See the CONTRIBUTORS.txt file in the distribution for a
 * full listing of individual contributors.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
package org.openremote.model.custom;

import com.fasterxml.jackson.databind.node.ArrayNode;
import org.openremote.model.asset.Asset;
import org.openremote.model.asset.AssetDescriptor;
import org.openremote.model.asset.agent.AgentLink;
import org.openremote.model.asset.agent.DefaultAgentLink;
import org.openremote.model.asset.impl.ElectricVehicleAsset;
import org.openremote.model.attribute.MetaItem;
import org.openremote.model.manager.ConfigurationResource;
import org.openremote.model.value.*;

import jakarta.persistence.Entity;

import java.util.Date;

import static org.openremote.model.Constants.*;
import static org.openremote.model.Constants.UNITS_HOUR;

/**
 * This is an example of a custom {@link Asset} type; this must be registered via an
 * {@link org.openremote.model.AssetModelProvider} and must conform to the following requirements:
 *
 * <ul>
 * <li>Must have {@link Entity} annotation
 * <li>Optionally add {@link ValueDescriptor}s
 * <li>Optionally add {@link org.openremote.model.value.MetaItemDescriptor}s
 * <li>Optionally add {@link AttributeDescriptor}s
 * <li>Must have a public static final {@link AssetDescriptor}
 * <li>Must have a protected no args constructor (for hydrators i.e. JPA/Jackson)
 * <li>For a given {@link Asset} type only one {@link AssetDescriptor} can exist
 * <li>{@link AttributeDescriptor}s that override a super class descriptor cannot change the
 * value type; just the formatting etc.
 * <li>{@link org.openremote.model.value.MetaItemDescriptor}s names must be unique
 * <li>{@link ValueDescriptor}s names must be unique
 * </ul>
 */
@Entity
public class LidarAsset extends Asset<LidarAsset> {
    public static final AssetDescriptor<LidarAsset> lidarAssetAssetDescriptor = new AssetDescriptor<>("eye-circle", "00aaaa", LidarAsset.class);

    public static final AttributeDescriptor<Date>   dateTime =                  new AttributeDescriptor<>("Dato",               ValueType.DATE_AND_TIME,            new MetaItem<>(MetaItemType.RULE_STATE), new MetaItem<>(MetaItemType.STORE_DATA_POINTS), new MetaItem<>(MetaItemType.ACCESS_RESTRICTED_WRITE), new MetaItem<>(MetaItemType.AGENT_LINK));
    public static final AttributeDescriptor<String> roadMarker =                new AttributeDescriptor<>("Sensornavn",         ValueType.TEXT,                     new MetaItem<>(MetaItemType.RULE_STATE), new MetaItem<>(MetaItemType.STORE_DATA_POINTS), new MetaItem<>(MetaItemType.ACCESS_RESTRICTED_WRITE), new MetaItem<>(MetaItemType.AGENT_LINK));
    public static final AttributeDescriptor<String> model =                     new AttributeDescriptor<>("Sensormodell",       ValueType.TEXT,                     new MetaItem<>(MetaItemType.RULE_STATE), new MetaItem<>(MetaItemType.STORE_DATA_POINTS), new MetaItem<>(MetaItemType.ACCESS_RESTRICTED_WRITE), new MetaItem<>(MetaItemType.AGENT_LINK));
    public static final AttributeDescriptor<String> sensorID =                  new AttributeDescriptor<>("SensorID",           ValueType.TEXT,                     new MetaItem<>(MetaItemType.RULE_STATE), new MetaItem<>(MetaItemType.STORE_DATA_POINTS), new MetaItem<>(MetaItemType.ACCESS_RESTRICTED_WRITE), new MetaItem<>(MetaItemType.AGENT_LINK));
    public static final AttributeDescriptor<Double> latitude =                  new AttributeDescriptor<>("Breddegrad",         ValueType.NUMBER,                   new MetaItem<>(MetaItemType.RULE_STATE), new MetaItem<>(MetaItemType.AGENT_LINK), new MetaItem<>(MetaItemType.AGENT_LINK));
    public static final AttributeDescriptor<Double> longitude =                 new AttributeDescriptor<>("Lengdegrad",         ValueType.NUMBER,                   new MetaItem<>(MetaItemType.RULE_STATE), new MetaItem<>(MetaItemType.AGENT_LINK));
    public static final AttributeDescriptor<Double> milliVolt =                 new AttributeDescriptor<>("Millivolt",          ValueType.NUMBER,                   new MetaItem<>(MetaItemType.RULE_STATE), new MetaItem<>(MetaItemType.AGENT_LINK)).withUnits(UNITS_MILLI, UNITS_VOLT);
    public static final AttributeDescriptor<Double> temperature =               new AttributeDescriptor<>("Temperatur",         ValueType.NUMBER,                   new MetaItem<>(MetaItemType.RULE_STATE), new MetaItem<>(MetaItemType.AGENT_LINK)).withUnits(UNITS_CELSIUS);
    public static final AttributeDescriptor<Double> tilt        =               new AttributeDescriptor<>("Tilt",               ValueType.NUMBER,                   new MetaItem<>(MetaItemType.RULE_STATE), new MetaItem<>(MetaItemType.AGENT_LINK)).withUnits(UNITS_DEGREE);
    public static final AttributeDescriptor<ValueType.ObjectMap[]> alert =      new AttributeDescriptor<>("ListeOverVarsler",            ValueType.JSON_OBJECT.asArray(),    new MetaItem<>(MetaItemType.STORE_DATA_POINTS), new MetaItem<>(MetaItemType.AGENT_LINK));
    public static final AttributeDescriptor<String> mostSevereAlarmSeverity=    new AttributeDescriptor<>("ViktigsteVarselsgrad",        ValueType.TEXT,                     new MetaItem<>(MetaItemType.RULE_STATE), new MetaItem<>(MetaItemType.STORE_DATA_POINTS));
    public static final AttributeDescriptor<String> mostSevereAlarmMessage=     new AttributeDescriptor<>("ViktigsteFeilmelding",        ValueType.TEXT,                     new MetaItem<>(MetaItemType.RULE_STATE), new MetaItem<>(MetaItemType.STORE_DATA_POINTS));


    protected LidarAsset() {
    }

    public LidarAsset(String name) {
        super(name);
    }

}
