import React from 'react';

import Sidebar from '../../components/Sidebar/Sidebar';
import Search from '../../components/Search/Search';
import classes from './Logs.css';
import LogsDetails from '../../components/LogsDetails/LogsDetails';
import Pagination from '../../components/Pagination/Pagination';

class Logs extends React.Component{
    state = {
        userLogs:[
            {name: 'Employee 1',
            inTimestamp: '06-08-2020 3 PM',
            outTimestamp: '06-08-2020 9 PM',

            designation: 'Designer'
            },
            {name: 'Employee 2',
            inTimestamp: '06-08-2020 3 PM',
            outTimestamp: '06-08-2020 9 PM',
            designation: 'UI'
            },
            {name: 'Employee 3',
            inTimestamp: '06-08-2020 3 PM',
            outTimestamp: '06-08-2020 9 PM',
            designation: 'Developer'
            },
            {name: 'Employee 4',
            inTimestamp: '06-08-2020 3 PM',
            outTimestamp: '06-08-2020 9 PM',
            designation: 'Designer'
            },
            {name: 'Employee 5',
            inTimestamp: '06-08-2020 3 PM',
            outTimestamp: '06-08-2020 9 PM',
            designation: 'UX'
            },
            {name: 'Employee 6',
            inTimestamp: '06-08-2020 3 PM',
            outTimestamp: '06-08-2020 9 PM',
            designation: 'Developer'
            },
            {name: 'Employee 7',
            inTimestamp: '06-08-2020 3 PM',
            outTimestamp: '06-08-2020 9 PM',
            designation: 'UX'
            },
            {name: 'Employee 8',
            inTimestamp: '06-08-2020 3 PM',
            outTimestamp: '06-08-2020 9 PM',
            designation: 'Designer'
            },
            {name: 'Employee 9',
            inTimestamp: '06-08-2020 3 PM',
            outTimestamp: '06-08-2020 9 PM',
            designation: 'Designer'
            },
            {name: 'Employee 10',
            inTimestamp: '06-08-2020 3 PM',
            outTimestamp: '06-08-2020 9 PM',
            designation: 'UI'
            },
            {name: 'Employee 11',
            inTimestamp: '06-08-2020 3 PM',
            outTimestamp: '06-08-2020 9 PM',
            designation: 'Developer'
            },
            {name: 'Employee 12',
            inTimestamp: '06-08-2020 3 PM',
            outTimestamp: '06-08-2020 9 PM',
            designation: 'Designer'
            },
            {name: 'Employee 13',
            inTimestamp: '06-08-2020 3 PM',
            outTimestamp: '06-08-2020 9 PM',
            designation: 'UX'
            },
            {name: 'Employee 14',
            inTimestamp: '06-08-2020 3 PM',
            outTimestamp: '06-08-2020 9 PM',
            designation: 'Developer'
            },
            {name: 'Employee 15',
            inTimestamp: '06-08-2020 3 PM',
            outTimestamp: '06-08-2020 9 PM',
            designation: 'UX'
            },
            {name: 'Employee 16',
            inTimestamp: '06-08-2020 3 PM',
            outTimestamp: '06-08-2020 9 PM',
            designation: 'Designer'
            },
            {name: 'Employee 17',
            inTimestamp: '06-08-2020 3 PM',
            outTimestamp: '06-08-2020 9 PM',
            designation: 'Designer'
            },
            {name: 'Employee 18',
            inTimestamp: '06-08-2020 3 PM',
            outTimestamp: '06-08-2020 9 PM',
            designation: 'UI'
            },
            {name: 'Employee 19',
            inTimestamp: '06-08-2020 3 PM',
            outTimestamp: '06-08-2020 9 PM',
            designation: 'Developer'
            },
            {name: 'Employee 20',
            inTimestamp: '06-08-2020 3 PM',
            outTimestamp: '06-08-2020 9 PM',
            designation: 'Designer'
            },
            {name: 'Employee 21',
            inTimestamp: '06-08-2020 3 PM',
            outTimestamp: '06-08-2020 9 PM',
            designation: 'UX'
            },
            {name: 'Employee 22',
            inTimestamp: '06-08-2020 3 PM',
            outTimestamp: '06-08-2020 9 PM',
            designation: 'Developer'
            },
            {name: 'Employee 23',
            inTimestamp: '06-08-2020 3 PM',
            outTimestamp: '06-08-2020 9 PM',
            designation: 'UX'
            },
            {name: 'Employee 24',
            inTimestamp: '06-08-2020 3 PM',
            outTimestamp: '06-08-2020 9 PM',
            designation: 'Designer'
            },
        ]
    }
    render(){
        return(
            <div>
                <Sidebar />
                <Search/>
                <div className={classes.Logs}>
                    <header>
                        <h2>User Logs</h2>
                    </header>
                    <div className={classes.Filters}>
                        <h4>Filters by:</h4>
                        <div>
                            <button>From Date</button>
                            <button>To Date</button>
                            <button>Weekly</button>
                            <button>Monthly</button>
                            <button>Designation</button>
                            <button>Name</button>
                            <button>Time</button>
                            <button>Leaves</button>
                        </div>
                    </div>
                    <LogsDetails logs={this.state.userLogs}/>
                    <Pagination />
                </div>
            </div>
        );
    }
}

export default Logs;