import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export const FinishJournalButton = ({ insets }: { insets: any }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#008000',
        paddingVertical: 14,
        paddingHorizontal: 24,
        margin: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: insets.bottom + 16,
      }}
      onPress={() => {
        console.log('[Journal] Finished journal entry');
        router.push('/home');
      }}
    >
      <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
        Finish Journal
      </Text>
    </TouchableOpacity>
  );
};