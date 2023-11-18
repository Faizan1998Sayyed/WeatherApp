import classes from "./CardTitle.module.css";

const CardTitle = () => {
  return (
    <section className={classes.section}>
      <div className={classes.dateWrapper}>
        <input className={classes["date-input"]} type="date" />
      </div>
      <article className={classes.article}>
        <div></div>
        <p>High Temperature</p>
        <p>Low Temperature</p>
        <p>Humidity</p>
        <p>Sunrise Time</p>
        <p>Sunset Time</p>
      </article>
    </section>
  );
};

export default CardTitle;
