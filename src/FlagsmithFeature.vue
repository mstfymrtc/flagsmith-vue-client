<script>
export default {
  props: {
    name: {
      default: '',
      required: true,
      type: String
    }
  },

  computed: {
    enabled() {
      return this.$store.state.flagsmith.featureFlags[this.name];
    }
  },

  render() {
    return this.enabled ? this.$slots.default : null;
  }
};
</script>
