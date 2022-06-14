import React from 'react';
import "@reach/dialog/styles.css";
import { Dialog, DialogOverlay, DialogContent } from "@reach/dialog";

export function Modal(props) {
  const [showDialog, setShowDialog] = React.useState(false);

  const offlineHandler = (event) => setShowDialog(true);

  const onlineHandler = () => setShowDialog(false);

  React.useEffect(() => {
    addEventListener('offline', offlineHandler);
    addEventListener('online', onlineHandler);
    return () => {
      removeEventListener('offline', offlineHandler);
      removeEventListener('online', onlineHandler);
    }
  }, []);

  return (
    <div>
      <Dialog
        isOpen={showDialog}
        style={{
          position: 'fixed',
          width: '90%',
          margin: '0 auto',
          height: '90%',
          backgroundColor: 'red',
        }}
      >
        <p>You're offline.</p>
      </Dialog>
      <span onClick={() => setShowDialog(!showDialog)}>After</span>
    </div>
  );
}
