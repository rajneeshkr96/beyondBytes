
const   ActionOptions = ({id}:{id:string}) => {
    const btnClass = 'w-full px-4 py-2 capitalize'
    return (
      <>
        <button className={btnClass}>follow author</button>
        <button className={btnClass}>mute author</button>
        <button className={`${btnClass} text-red-400`}>Report......</button>
      </>
    )
  }

  export default ActionOptions;