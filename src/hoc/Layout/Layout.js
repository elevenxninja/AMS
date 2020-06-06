import React from 'react';

import Sidebar from '../../components/Sidebar/Sidebar';

import EmployeesList from '../../containers/EmployeesList/EmployeesList';


class Layout extends React.Component{
    render(){
        return(
            <div>
                <Sidebar />
                
                <EmployeesList />
            </div>
        );
    }
}

export default Layout;