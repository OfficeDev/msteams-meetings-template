import { OnlineMeeting } from '../meeting-creator/models';

export const saveMeeting = (meeting: OnlineMeeting) => {
  const message = {
    action: 'saveMeeting',
    meeting,
  };

  return new Promise((resolve, reject) => {
    const receiveMessage = (event: MessageEvent) => {
      let reply;
      try {
        reply = JSON.parse(event.data);
      } catch (err) {
        reply = null;
      }

      if (reply) {
        if (reply.action === 'saved') {
          resolve();
          window.removeEventListener("message", receiveMessage);
        } else if (reply.action === 'error') {
          reject(reply.error);
          window.removeEventListener("message", receiveMessage);
        }
      }
    };
  
    window.addEventListener("message", receiveMessage);
    window.postMessage(JSON.stringify(message), '*');
  });
};
