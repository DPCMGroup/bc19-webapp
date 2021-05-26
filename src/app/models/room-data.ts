export class RoomData {
  id = 0;
  roomname = '';
  xroom = 0;
  yroom = 0;
  archived = 0;
  unavailable = 0;
}

export class RoomDataWithField extends RoomData{
  isDataAvailable = 0;
}
