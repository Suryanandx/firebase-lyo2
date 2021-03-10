import React from 'react';
import PieChartIcon from '@material-ui/icons/PieChart';
import HomeIcon from '@material-ui/icons/Home';
import PhoneCallbackIcon from '@material-ui/icons/PhoneCallback';
import BuildIcon from '@material-ui/icons/Build';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ViewCompactIcon from '@material-ui/icons/ViewCompact';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

export const SidebarData = [
    {
        title: 'Reports',
        path: '/machine-data',
        icon: <AssessmentIcon style={{color: "white"}}/>,
        iconClosed: <ArrowDropDownIcon style={{color: "white"}}/>,
        iconOpened: <ArrowDropUpIcon style={{color: "white"}}/>,
        subNav: [
            {
                title: 'Call-Logs',
                path: '/machine-data/Reports',
                icon: <PhoneCallbackIcon style={{color: "white"}}/>
            },
            {
                title: 'Batch-Logs',
                path: '/machine-data/Reports',
                icon: <BuildIcon style={{color: "white"}}/>
            },
            {
                title: 'Process',
                path: '/machine-data/Reports',
                icon: <PieChartIcon style={{color: "white"}}/>
            }

        ]
    },
    
    {
        title: 'Content',
        path: '/machine-data',
        icon: <ViewCompactIcon style={{color: "white"}}/>,
       
    },
    
]

