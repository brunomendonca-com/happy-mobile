import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import api from '../services/api';
import mapMarker from '../images/map-marker.png';

interface FosterHome {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  // about:string,
  // instructions:string,
  // opening_hours: string,
  // open_on_weekends:boolean,
  // images:
}

const FosterHomesMap: React.FC = () => {
  const [fosterHomes, setFosterHomes] = useState<FosterHome[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    api.get('/fosterhomes').then(response => {
      setFosterHomes(response.data);
    });
  }, []);

  const handleNavigateToFosterHomeDetails = (id: number) => {
    navigation.navigate('FosterHomeDetails', { id });
  };

  const handleNavigateToCreateFosterHome = () => {
    navigation.navigate('SelectMapPosition');
  };

  const getNumberOfFosterHomesFound = (number: number) => {
    if (!number || typeof number !== 'number')
      return `No foster home was found`;

    switch (number) {
      case 0:
        return `No foster home was found`;
      case 1:
        return `${fosterHomes.length} foster home found`;
      default:
        return `${fosterHomes.length} foster homes found`;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 51.044537,
          longitude: -114.071559,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {fosterHomes.map(fosterHome => {
          return (
            <Marker
              key={fosterHome.id}
              icon={mapMarker}
              calloutAnchor={{
                x: 2.7,
                y: 0.8,
              }}
              coordinate={{
                latitude: fosterHome.latitude,
                longitude: fosterHome.longitude,
              }}
            >
              <Callout
                tooltip
                onPress={() => handleNavigateToFosterHomeDetails(fosterHome.id)}
              >
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{fosterHome.name}</Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {getNumberOfFosterHomesFound(fosterHomes.length)}
        </Text>
        <RectButton
          style={styles.createFosterhomeButton}
          onPress={handleNavigateToCreateFosterHome}
        >
          <Feather name="plus" size={20} color="#fff" />
        </RectButton>
      </View>
    </View>
  );
};

export default FosterHomesMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center',
  },
  calloutText: {
    color: '#0089a5',
    fontSize: 14,
    fontFamily: 'Nunito_700Bold',
  },
  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: '#fff',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  footerText: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_700Bold',
  },
  createFosterhomeButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',
  },
});
