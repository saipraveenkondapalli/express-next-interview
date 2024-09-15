"use client";

import React, {useState} from 'react';
import {Box, CloseButton, Text} from '@chakra-ui/react';

interface NotificationProps {
    message: string; // Change to a single message
    category: 'info' | 'danger'; // Define the category type
}

const Notification: React.FC<NotificationProps> = ({message, category}) => {
    // Set background color based on category
    const bgColor = category === 'danger' ? 'red.500' : 'blue.500';
    const [isVisible, setIsVisible] = useState<boolean>(true); // Start as visible

    return <>
        {isVisible && <>
            <Box
                bg={bgColor}
                color="white"
                p={2}
                mb={2}
                borderRadius="md"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <Text>{message}</Text>
                <CloseButton onClick={() => setIsVisible(false)}/>
            </Box>
        </>
        }


    </>
};

export default Notification;
