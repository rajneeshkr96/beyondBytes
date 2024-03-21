
"use Client"

const   ActionOptions = ({id}:{id:string}) => {
    const btnClass = 'w-full px-4 py-2 capitalize'
  const onFollow = async () =>{
    try {
      
    } catch (error) {
      
    }
  }
  const onMute = () =>{};

    return (
      <>
        <button className={btnClass} onClick={onFollow}>follow author</button>
        <button className={btnClass}>mute author</button>
        <button className={`${btnClass} text-red-400`}>Report......</button>
      </>
    )
  }

  export default ActionOptions;