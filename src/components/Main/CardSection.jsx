import Card from './Card'

const cardData = []

const CardSection = () => {
  return (
    <div className="grid grid-cols-5 gap-2 pt-8 mb-10">
        {cardData.map((card) => {
            return <div key={card.id}>
                <Card 
                    id={card.id} 
                    name={card.name} 
                    img={card.image}
                    status={card.status}/></div>
        })}
    </div>
  )
}

export default CardSection




// const handleShowMap = () => {
//   // Initialize map and markers
//   const map = new window.google.maps.Map(document.getElementById("map"), {
//     center: { lat: 0, lng: 0 },
//     zoom: 2,
//   });
//   const markers = [];

//   // Add a marker for each user
//   users.forEach((user) => {
//     const marker = new window.google.maps.Marker({
//       position: { lat: user.latitude, lng: user.longitude },
//       title: user.name,
//     });
//     markers.push(marker);
//   });

//   // Set markers on the map
//   const markerCluster = new window.MarkerClusterer(map, markers, {
//     imagePath:
//       "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
//   });
// };
