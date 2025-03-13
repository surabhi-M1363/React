import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import './styles/AnalyticsReporting.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AnalyticsReporting = () => {
    const [accidentData, setAccidentData] = useState([]);
    const [severityData, setSeverityData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/analytics/summary');
                const data = await response.json();

                // Convert fetched data to required format
                const formattedAccidentData = [
                    { month: 'Jan', accidents: data.january || 0 },
                    { month: 'Feb', accidents: data.february || 0 },
                    { month: 'Mar', accidents: data.march || 0 },
                    { month: 'Apr', accidents: data.april || 0 },
                    { month: 'May', accidents: data.may || 0 }
                ];

                const formattedSeverityData = [
                    { name: 'Minor', value: data.minor || 0 },
                    { name: 'Moderate', value: data.moderate || 0 },
                    { name: 'Severe', value: data.severe || 0 },
                    { name: 'Fatal', value: data.fatal || 0 }
                ];

                setAccidentData(formattedAccidentData);
                setSeverityData(formattedSeverityData);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading analytics...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="analytics-container">
            <h2>Analytics & Reporting</h2>
            
            {/* Bar Chart */}
            <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={accidentData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="accidents" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Line Chart */}
            <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={accidentData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="accidents" stroke="#ff7300" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie data={severityData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value">
                            {severityData.map((entry, index) => (
                                <Cell key={cell-${index}} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AnalyticsReporting;