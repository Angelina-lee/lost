const INITITAL_STATE = {
    stepper: {
        style: {
            container: {
              paddingTop: 24,          //pixel
              paddingBottom: 24,       //pixel
            },
            shape: {
              size: 80,
              borderWidth: 4,
              borderRadius: '50%',
            },
            line: {
              borderWidth: 3,
              borderColor: 'gray',
              padding: 0
            }
          },
        steps: [
            {
              text: '1',
              icon: 'fa-server',
              shapeBorderColor: 'green',
              shapeBackgroundColor: 'white',
              shapeContentColor: 'green',
              verified: false,
            },
            {
              text: '2',
              icon: 'fa-server',
              shapeBorderColor: '#f4b042',
              shapeBackgroundColor: 'white',
              shapeContentColor: '#f4b042',
              verified: false,
              modalOpened: false,
              modalClickedId: 0,
              svgStyle: {
                width: "800px"
            }
            },
            {
                text: '3',
                icon: 'fa-server',
                shapeBorderColor: '#f4b042',
                shapeBackgroundColor: 'white',
                shapeContentColor: '#f4b042',
                verified: false,
            },
            {
                text: '4',
                icon: 'fa-server',
                shapeBorderColor: '#f4b042',
                shapeBackgroundColor: 'white',
                shapeContentColor: '#f4b042',
                verified: false,
             }
        ],
        currentStep: 0
    },
    step2Data: {
        name: '',
        description: ''
    }
}


const INITITAL_STATE_ANNO_TASK_MODAL = {
    style: {
        container: {
          paddingTop: 24,          //pixel
          paddingBottom: 24,       //pixel
        },
        shape: {
          size: 80,
          borderWidth: 4,
          borderRadius: '50%',
        },
        line: {
          borderWidth: 3,
          borderColor: 'gray',
          padding: 0
        }
      },
    steps: [
        {
          text: '1',
          icon: 'fa-server',
          shapeBorderColor: 'green',
          shapeBackgroundColor: 'white',
          shapeContentColor: 'green',
          verified: true,
        },
        {
          text: '2',
          icon: 'fa-server',
          shapeBorderColor: '#f4b042',
          shapeBackgroundColor: 'white',
          shapeContentColor: '#f4b042',
          verified: false,
          svgStyle: {
            width: "800px"
        }
        },
        {
            text: '3',
            icon: 'fa-server',
            shapeBorderColor: '#f4b042',
            shapeBackgroundColor: 'white',
            shapeContentColor: '#f4b042',
            verified: false,
        },
        {
            text: '4',
            icon: 'fa-server',
            shapeBorderColor: '#f4b042',
            shapeBackgroundColor: 'white',
            shapeContentColor: '#f4b042',
            verified: false,
         }
    ],
    currentStep: 0
}

export default (state = INITITAL_STATE, action)=>{
    switch(action.type){
        case 'PIPELINE_START_SELECT_TAB':
        return {
            ...state,
            stepper: {
                ...state.stepper,
                currentStep: action.payload.tabId
            }
        }
        case 'PIPELINE_START_VERIFY_TAB':
        return {
            ...state,
            stepper: {
                ...state.stepper,
                steps: state.stepper.steps.map((el,i)=>{
                    if(i === action.payload.tabId){
                        return {
                            ...el,
                            verified: action.payload.verified
                        }
                    }
                    return el
                })
            }
        }

        // DATASOURCE START
        case 'PIPELINE_START_DATASOURCE_SELECT_DROPDOWN':
        return{
            ...state,
            step1Data:{
                ...state.step1Data,
                elements: state.step1Data.elements.map((el)=>{
                    if('datasource' in el && (el.peN == action.payload.elementId)){
                        return {
                            ...el,
                            exportData: {
                                ...el.exportData,
                                datasource: {
                                    ...el.exportData.datasource,
                                    rawFilePath: action.payload.value
                                }
                            }
                        }
                    }
                    return el
                })
            }
        }
        // DATASOURCE END

        //SCRIPT START
        case 'PIPELINE_START_SCRIPT_UPDATE_ARGUMENTS':
        return{
            ...state,
            step1Data:{
                ...state.step1Data,
                elements: state.step1Data.elements.map((el)=>{
                    if('script' in el && (el.peN == action.payload.elementId)){
                        // return {
                        //     ...el,
                        //     exportData: {
                        //         ...el.exportData,
                        //         datasource: {
                        //             ...el.exportData.annoTask,
                        //             rawFilePath: action.payload.value
                        //         }
                        //     }
                        // }
                    }
                    return el
                })
            }
        }
        //SCRIPT END
        // ANNO TASK START

        case 'PIPELINE_START_ANNO_TASK_SELECT_TAB':
            return {
                ...state,
                step1Data:{
                    ...state.step1Data,
                    elements: state.step1Data.elements.map((el)=>{
                        if('annoTask' in el && (el.peN == action.payload.elementId)){
                            return {
                                ...el,
                                stepper: {
                                    ...el.stepper,
                                    currentStep: action.payload.tabId
                                }
                            }
                        }
                        return el
                    })
                }
            }
        case 'PIPELINE_START_ANNO_TASK_VERIFY_TAB':
            return {
                ...state,
                step1Data: {
                    ...state.step1Data,
                    elements: state.step1Data.elements.map((el)=> {
                        if('annoTask' in el && (el.peN == action.payload.elementId)){
                            return {
                                ...el,
                                stepper: {
                                    ...el.stepper,
                                    steps: el.stepper.steps.map((el,i )=>{
                                        if(i === action.payload.tabId){
                                            return {
                                                ...el,
                                                verified: action.payload.verified
                                            }
                                        }
                                        return el
                                    })
                                }
                            }
                        }
                        return el
                    })
                }
            }
        case 'PIPELINE_START_ANNO_TASK_NAME_INPUT':
            return{
                ...state,
                step1Data:{
                    ...state.step1Data,
                    elements: state.step1Data.elements.map((el)=>{
                        if('annoTask' in el && (el.peN == action.payload.elementId)){
                            return {
                                ...el,
                                exportData: {
                                    ...el.exportData,
                                    annoTask: {
                                        ...el.exportData.annoTask,
                                        name: action.payload.value
                                    }
                                }
                            }
                        }
                        return el
                    })
                }
            }
        case 'PIPELINE_START_ANNO_TASK_INSTRUCTIONS_INPUT':
        return{
            ...state,
            step1Data:{
                ...state.step1Data,
                elements: state.step1Data.elements.map((el)=>{
                    if('annoTask' in el && (el.peN == action.payload.elementId)){
                        return {
                            ...el,
                            exportData: {
                                ...el.exportData,
                                annoTask: {
                                    ...el.exportData.annoTask,
                                    instructions: action.payload.value
                                }
                            }
                        }
                    }
                    return el
                })
            }
        }
        case 'PIPELINE_START_ANNO_TASK_SELECT_USER':
        return{
            ...state,
            step1Data:{
                ...state.step1Data,
                elements: state.step1Data.elements.map((el)=>{
                    if('annoTask' in el && (el.peN == action.payload.elementId)){
                        return {
                            ...el,
                            exportData: {
                                ...el.exportData,
                                annoTask: {
                                    ...el.exportData.annoTask,
                                    assignee: action.payload.assignee,
                                    workerId: parseInt(action.payload.workerId)
                                }
                            }
                        }
                    }
                    return el
                })
            }
        }
        case 'PIPELINE_START_ANNO_TASK_SELECT_TREE':
        return{
            ...state,
            step1Data:{
                ...state.step1Data,
                elements: state.step1Data.elements.map((el)=>{
                    if('annoTask' in el && (el.peN == action.payload.elementId)){
                        return {
                            ...el,
                            exportData: {
                                ...el.exportData,
                                annoTask: {
                                    ...el.exportData.annoTask,
                                    selectedLabelTree: parseInt(action.payload.value),
                                }
                            }
                        }
                    }
                    return el
                })
            }
        }
        case 'PIPELINE_START_ANNO_TASK_UPDATE_LABELS':
        return{
            ...state,
            step1Data:{
                ...state.step1Data,
                elements: state.step1Data.elements.map((el)=>{
                    if('annoTask' in el && (el.peN == action.payload.elementId)){
                        return {
                            ...el,
                            exportData: {
                                ...el.exportData,
                                annoTask: {
                                    ...el.exportData.annoTask,
                                    labelLeaves: action.payload.lableArr
                                }
                            }
                        }
                    }
                    return el
                })
            }
        }

        // ANNO TASK END

        case 'PIPELINE_START_VERIFY_NODE':
        return{
            ...state,
            step1Data:{
                ...state.step1Data,
                elements: state.step1Data.elements.map((el)=>{
                    if((el.peN == action.payload.elementId)){
                        return {
                            ...el,
                            verified: action.payload.verified
                        }
                    }
                    return el
                })
            }
        }
        case 'PIPELINE_START_GET_TEMPLATES':
            return {
                ...state,
                step0Data: action.payload

            }
        case 'PIPELINE_START_GET_TEMPLATE':

            return {
                ...state,
                step0Data: {
                    ...state.step0Data,
                    templateId: parseInt(action.payload.templateId)
                },
                step1Data: {
                    ...action.payload.response,
                    elements: action.payload.response.elements.map((el) =>{
                        if('datasource' in el){
                            return {
                                ...el,
                                verified: false,
                                exportData: {
                                    peN: el.peN,
                                    datasource: {
                                        rawFilePath: null,
                                    }
                                }
                            }
                        }else if('script' in el){
                            return {
                                ...el,
                                verified: el.script.arguments?Object.keys(el.script.arguments).filter(el2=>!el.script.arguments[el2].value).length === 0: true,
                                exportData: {
                                    peN: el.peN,
                                    script: {
                                        arguments: el.script.arguments,
                                        description: el.script.description,
                                        envs: el.script.envs,
                                        id: el.script.id,
                                        name: el.script.name,
                                        path: el.script.path,
                                        isDebug: false
                                    }
                                }
                            }
                        }
                        else if('annoTask' in el){
                            return {
                                ...el,
                                stepper: INITITAL_STATE_ANNO_TASK_MODAL,
                                verified: false,
                                exportData: {
                                    peN: el.peN,
                                    annoTask:{
                                        name: el.annoTask.name,
                                        type: el.annoTask.type,
                                        instructions: el.annoTask.instructions,
                                        configuration: el.annoTask.configuration,
                                        assignee: null,
                                        workerId: null,
                                        labelLeaves: [],
                                        selectedLabelTree: null


                                    }
                                }
                            }
                        }else if('dataExport' in el){
                            return{
                                ...el,
                                exportData: {
                                    dataExport: {},
                                    peN: el.peN
                                },
                                verified:true
                            }
                        }else if('loop' in el){
                            return{
                                ...el,
                                verified: true,
                                exportData: {
                                    loop: el.loop,
                                    peN: el.peN
                                }
                            }
                        }

                        return el
                        
                    })
                }
            }
        case 'PIPELINE_START_TOGGLE_MODAL':
            return {
                ...state,
                stepper: {
                    ... state.stepper,
                    steps: state.stepper.steps.map((el,i)=>{
                        // Graph Data
                        if(i == 1){
                            return {
                                ...el,
                                modalOpened : !state.stepper.steps[1].modalOpened,
                                modalClickedId: action.payload.id
                            }
                        }
                        return el
                    })
                }
            }

            // TAB2
        case 'PIPELINE_START_NAME_INPUT':
            return {
                ...state,
                step2Data: {
                    ...state.step2Data,
                    name: action.payload.value,
                }
            }
        case 'PIPELINE_START_DESCRIPTION_INPUT':
            return {
                ...state,
                step2Data: {
                    ...state.step2Data,
                    description: action.payload.value,
                }
            }

        // TAB 3
        case 'PIPELINE_START_POST_PIPE':
            return{
                ...state,
                step3Data: {
                    response: action.payload
                }
            }
        default:
            return state
    }

}