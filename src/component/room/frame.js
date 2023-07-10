import './room.css';

const RoomNameFrame = (props) => {
  const { roomName } = props;
  return (
    <div
      style={{
        marginTop: '10px',
      }}>
      <figure class="wave">
        <h1> اتاق {roomName}</h1>
      </figure>
    </div>
  );
};

export default RoomNameFrame;
