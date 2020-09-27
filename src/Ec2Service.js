import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import NotInterestedIcon from '@material-ui/icons/NotInterested'
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress'
import LinearProgress from '@material-ui/core/LinearProgress'
import RefreshIcon from '@material-ui/icons/Refresh'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  btn: {
    display: "flex",    
    justifyContent: "flex-end",
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10
  }
})

const Ec2Service = (props) => {
    const { match } = props
    const { params } = match
    console.log(params.owner)
    const [data, setData] = useState([])
    const [dataFetch, setDataFetch] = useState(false)
    const classes = useStyles()
    const performAction = (instanceId, action) => {
      console.log("OnClick action....")
      let url = 'http://localhost:8000/start?instanceId='
      if (action === 'stop') {
        url = 'http://localhost:8000/stop?instanceId='
      }  else if(action === 'terminate') {
        url = 'http://localhost:8000/terminate?instanceId='
      }  else if(action === "fetch") {
        url = 'http://localhost:8000/get?owner=' + params.owner
      }
      setDataFetch(false)
      axios.post(
        url += instanceId
      ).then(res => {                    
        console.log(res)
        axios(
          'http://localhost:8000/get?owner=' + params.owner,
        ).then(res => {            
          setData(res.data);
          console.log(res.data)
          setDataFetch(true)
        })     
      })
    }

    useEffect(() => {
      axios(
        'http://localhost:8000/get?owner=' + params.owner,
      ).then(res => {            
        setData(res.data);
        console.log(res.data)
        setDataFetch(true)
    })           
    }, [params.owner]);

    return (
      <>
        {!dataFetch && <LinearProgress color="secondary"/>}        
        { dataFetch &&  
        <>   
        <div className={ classes.btn }>
        <Button variant="contained" color="primary" startIcon={<RefreshIcon/>} onClick={() => performAction('', 'fetch')}>
          Refresh
        </Button> 
        </div>         
        <MaterialTable title="EC2 Instance Details" 
        columns={[
          { title: 'Name', field: 'Name' },
          { title: 'Instance ID', field: 'InstanceId'},
          { title: 'Region', field: 'Region' },
          { title: 'State', field: 'Status' },
          { title: 'AZ', field: 'Az' },
          { title: 'IP', field: 'PrivateIp' }
        ]}
        data={data}   
        actions={[
            rowData => ({
              icon: 'stop',
              tooltip: 'Stop Instance',
              onClick: (event, rowData) => {
                performAction(rowData.InstanceId, 'stop')
              },
              hidden: rowData.Status !== 'running'
            }),
            rowData => ({
              icon: PlayArrowIcon,
              tooltip: 'Start Instance',  
              onClick: (event, rowData) => {
                performAction(rowData.InstanceId, 'start')
              },          
              hidden: rowData.Status !== 'stopped'
            }),
            rowData => ({
              icon: NotInterestedIcon,
              tooltip: 'Terminate Instance',  
              onClick: (event, rowData) => {
                performAction(rowData.InstanceId, 'terminate')
              },          
              hidden: rowData.Status !== 'stopped' && rowData.Status !== 'running'
            })
        ]}                 
        options={{
        headerStyle: {
            backgroundColor: '#01579b',
            color: '#FFF',              
        },
        rowStyle: rowData => ({
            backgroundColor: (rowData.tableData.id % 2 === 1) ? '#EEE' : '#FFF'
            })
        }}            
      />
        </>}
      </>
    )
}

export default Ec2Service