import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';

const CameraFeed = () => {
  const [selectedCamera, setSelectedCamera] = useState(0);
  const [detectionMode, setDetectionMode] = useState(true);

  const cameras = [
    { id: 0, name: 'CAM-01', location: 'Floor 1 - Lobby', status: 'Active', detection: 'Clear' },
    { id: 1, name: 'CAM-02', location: 'Floor 2 - East Wing', status: 'Active', detection: 'Smoke - 89%' },
    { id: 2, name: 'CAM-03', location: 'Floor 2 - West Wing', status: 'Active', detection: 'Clear' },
    { id: 3, name: 'CAM-04', location: 'Floor 3 - Server Room', status: 'Active', detection: 'Heat - 67%' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>CAMERA FEEDS</Text>
        <Text style={styles.subtitle}>AI FIRE DETECTION SYSTEM</Text>
      </View>

      {/* Camera Grid */}
      <View style={styles.grid}>
        {cameras.map((camera) => (
          <TouchableOpacity
            key={camera.id}
            onPress={() => setSelectedCamera(camera.id)}
            style={[
              styles.cameraCard,
              selectedCamera === camera.id 
                ? styles.cameraSelected 
                : styles.cameraDefault
            ]}
          >
            {/* Simulated video feed */}
            <View style={styles.videoFeed}>
              <View style={styles.videoBorder} />
              
              {/* Detection overlay */}
              {detectionMode && camera.detection !== 'Clear' && (
                <View style={styles.detectionOverlay}>
                  <View style={styles.detectionBadge}>
                    <Text style={styles.detectionText}>🔥 {camera.detection}</Text>
                  </View>
                  {/* Bounding box */}
                  <View style={styles.boundingBox} />
                </View>
              )}
              
              {/* Camera info */}
              <Text style={styles.cameraName}>{camera.name}</Text>
              
              {/* Recording indicator */}
              <View style={styles.recordingDot} />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Selected Camera Details */}
      <View style={styles.detailsCard}>
        <Text style={styles.detailsTitle}>
          {cameras[selectedCamera].name} - {cameras[selectedCamera].location}
        </Text>
        <View style={styles.detailsGrid}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Status: </Text>
            <Text style={styles.statusActive}>{cameras[selectedCamera].status}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Detection: </Text>
            <Text style={
              cameras[selectedCamera].detection === 'Clear' 
                ? styles.detectionClear 
                : styles.detectionAlert
            }>
              {cameras[selectedCamera].detection}
            </Text>
          </View>
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleLabel}>AI Detection:</Text>
          <TouchableOpacity
            onPress={() => setDetectionMode(!detectionMode)}
            style={[
              styles.toggleTrack,
              detectionMode ? styles.toggleOn : styles.toggleOff
            ]}
          >
            <View style={[
              styles.toggleThumb,
              detectionMode ? styles.thumbOn : styles.thumbOff
            ]} />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.snapshotButton}>
          <Text style={styles.snapshotText}>📸 SNAPSHOT</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const { width } = Dimensions.get('window');
const cameraWidth = (width - 36) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f12',
    paddingHorizontal: 12,
    paddingTop: 24,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff5e00',
    textShadowColor: 'rgba(255, 94, 0, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    fontFamily: 'monospace',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#aaaaaa',
    fontFamily: 'monospace',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cameraCard: {
    width: cameraWidth,
    aspectRatio: 16/9,
    borderRadius: 8,
    borderWidth: 2,
    marginBottom: 12,
    overflow: 'hidden',
  },
  cameraDefault: {
    borderColor: 'rgba(255, 94, 0, 0.3)',
  },
  cameraSelected: {
    borderColor: '#ff5e00',
    borderWidth: 3,
  },
  videoFeed: {
    flex: 1,
    backgroundColor: 'rgba(15, 15, 18, 0.8)',
  },
  videoBorder: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 8,
    bottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 94, 0, 0.3)',
    borderRadius: 4,
  },
  detectionOverlay: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 8,
  },
  detectionBadge: {
    backgroundColor: 'rgba(255, 50, 50, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  detectionText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'monospace',
  },
  boundingBox: {
    position: 'absolute',
    top: 32,
    left: 16,
    width: 64,
    height: 48,
    borderWidth: 2,
    borderColor: 'red',
  },
  cameraName: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#00ff00',
  },
  recordingDot: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 8,
    height: 8,
    backgroundColor: 'red',
    borderRadius: 4,
  },
  detailsCard: {
    backgroundColor: 'rgba(30, 30, 36, 0.7)',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 94, 0, 0.2)',
    marginBottom: 20,
  },
  detailsTitle: {
    color: '#ff5e00',
    fontFamily: 'monospace',
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 12,
  },
  detailsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
  },
  detailLabel: {
    color: '#888888',
    fontSize: 14,
    fontFamily: 'monospace',
  },
  statusActive: {
    color: '#00ff00',
    fontSize: 14,
    fontFamily: 'monospace',
  },
  detectionClear: {
    color: '#00ff00',
    fontSize: 14,
    fontFamily: 'monospace',
  },
  detectionAlert: {
    color: '#ff5555',
    fontSize: 14,
    fontFamily: 'monospace',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleLabel: {
    color: '#888888',
    fontSize: 14,
    fontFamily: 'monospace',
    marginRight: 8,
  },
  toggleTrack: {
    width: 48,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleOn: {
    backgroundColor: '#00aa00',
  },
  toggleOff: {
    backgroundColor: '#444444',
  },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  thumbOn: {
    alignSelf: 'flex-end',
  },
  thumbOff: {
    alignSelf: 'flex-start',
  },
  snapshotButton: {
    backgroundColor: '#ff5e00',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  snapshotText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
});

export default CameraFeed;