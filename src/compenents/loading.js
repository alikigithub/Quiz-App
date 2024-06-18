export default function Loading({ statusupdate }) {
  return (
    <div className="loading">
      <h1>Welcome to React Quiz</h1>
      <h4>15 Questions to test Your React mastery</h4>
      <button
        className="btn"
        onClick={() => {
          statusupdate();
        }}
      >
        Let's Start
      </button>
    </div>
  );
}
