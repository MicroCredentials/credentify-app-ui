<template>
  <div class="form">
    <h3>Security</h3>
    <div class="form--heading">
      Security options
    </div>
    <div class="fields in-row">
      <div class="field--item">
        <label for="alerts" class="pointer">
          <input id="alerts" type="checkbox" class="switch" />
          Enable 2FA
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  transition: {
    name: 'slide-fade',
    mode: 'out-in'
  }
}
</script>
