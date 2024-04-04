import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
const NotificationBubble: React.FC<{ count: number }> = ({ count }) => {
    const colorScheme = useColorScheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <FontAwesome
       name="list"
       size={25}
       color={Colors[colorScheme ?? 'light'].text}
       style={{ marginRight: 15, opacity: 1 }}
      />
      {count > 0 && (
        <View style={{ backgroundColor: 'red', borderRadius: 10, padding: 5 }}>
          <Text style={{ color: 'white' }}>{count}</Text>
        </View>
      )}
    </View>
  );
};

export default NotificationBubble;
