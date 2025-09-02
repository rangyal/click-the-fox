import { Button } from '../components';

const ErrorScreen = () => (
  <div className="text-center space-y-6">
    <h1 className="text-2xl font-bold">🤦‍♂️ Oops!</h1>
    <p>Looks like the code had a moment of existential crisis!</p>
    <p className="text-sm text-gray-600">
      <Button variant="link" onClick={() => window.location.reload()}>
        Refresh
      </Button>{' '}
      the page - it's like turning it off and on again, but for the web! 🔄
    </p>
  </div>
);

export { ErrorScreen };
