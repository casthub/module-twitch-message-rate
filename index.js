module.exports = class extends window.casthub.elements.counter {

    /**
     * Initialize the new Module.
     */
    constructor() {
        super();

        /**
         * Total messages in the last (current) minute.
         *
         * @type {Number}
         */
        this.current = 0;

        // Set the params for the Counter Module parent.
        this.label = 'Messages p/Minute';
        this.color = 'rgba(100, 65, 164, 0.5)';
        this.max = 30; // Max. data points for the chart.
    }

    /**
     * @return {Promise}
     */
    async mounted() {
        await super.mounted();

        const { id } = this.identity;

        // Connect to Twitch Chat.
        this.chat = await window.casthub.chat(id);

        // Set the initial count.
        this.count = 0;

        // Start the interval.
        setInterval(() => this.inc(), 60000);

        // Bind the event.
        this.chat.on('message', () => {
            this.current++;
        });
    }

    /**
     * Increments the current count and resets.
     */
    inc() {
        this.count = this.current;
        this.current = 0;
    }

};
