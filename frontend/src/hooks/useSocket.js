import { useEffect, useRef, useState, useCallback } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5001';

export function useSocket() {
    const socketRef = useRef(null);
    const [isConnected, setIsConnected] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const [stats, setStats] = useState({
        totalTransactions: 0,
        suspiciousTransactions: 0,
        transactionVolume: 0,
        averageRiskScore: 0
    });

    useEffect(() => {
        const socket = io(SOCKET_URL, {
            transports: ['websocket', 'polling'],
            reconnectionAttempts: 10,
            reconnectionDelay: 1000
        });
        socketRef.current = socket;

        socket.on('connect', () => setIsConnected(true));
        socket.on('disconnect', () => setIsConnected(false));

        socket.on('newTransaction', (transaction) => {
            setTransactions(prev => [transaction, ...prev].slice(0, 100));
        });

        socket.on('fraudAlert', (alert) => {
            setAlerts(prev => [alert, ...prev].slice(0, 50));
        });

        socket.on('stats', (newStats) => {
            setStats(newStats);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const setRole = useCallback((role) => {
        if (socketRef.current) {
            socketRef.current.emit('setRole', role);
        }
    }, []);

    return { isConnected, transactions, alerts, stats, setRole };
}
