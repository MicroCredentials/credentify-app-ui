<template>
  <form class="billing form" @submit.prevent="submit()">
    <div class="form--heading">
      Enter credit card details
    </div>
    <div class="fields in-row">
      <div class="field--item grow">
        <label for="username">Card number details</label>
        <input type="text" placeholder="XXXX-XXXX-XXXX-XXXX" />
      </div>
      <div class="field--item shrink">
        <input type="text" placeholder="MM/YY" style="width: 80px;" />
      </div>
      <div class="field--item shrink">
        <input type="text" placeholder="CVC" style="width: 60px;" />
      </div>
    </div>
    <div class="form--heading">
      Billilng information
    </div>
    <div class="fields in-row equal">
      <div class="field--item">
        <label for="">First name</label>
        <input type="text" placeholder="Enter your first name" />
      </div>
      <div class="field--item br-0">
        <label for="">Last name</label>
        <input type="text" placeholder="Enter your last name" />
      </div>
      <div class="field--item">
        <label for="">Company name</label>
        <input type="text" placeholder="Enter company name" />
      </div>
      <div class="field--item br-0">
        <label for="">VAT ID</label>
        <input type="text" placeholder="Company VAT ID number" />
      </div>
      <div class="field--item full br-0">
        <label for="">Street address</label>
        <input
          type="text"
          placeholder="Enter a street address and house number"
        />
      </div>
      <div class="field--item">
        <label for="">City</label>
        <input type="text" placeholder="Enter your city" />
      </div>
      <div class="field--item br-0">
        <label for="">Postal code</label>
        <input type="text" placeholder="Enter a postal code" />
      </div>
      <div class="field--item">
        <label for="">Country</label>
        <v-select :options="options" :label="'title'">
          <template slot="option" slot-scope="option">
            {{ option.title }}
            <span class="description">({{ option.description }})</span>
          </template>
        </v-select>
      </div>
      <div class="field--item br-0">
        <label for="">Region</label>
        <input type="text" placeholder="Select your reagion" />
      </div>
    </div>
  </form>
</template>

<script>
export default {
  transition: {
    name: 'slide-fade',
    mode: 'out-in'
  },
  data() {
    return {
      options: [
        {
          title: 'Slovenia',
          description: 'SI'
        },
        {
          title: 'United Kingdom',
          description: 'UK'
        },
        {
          title: 'Germany',
          description: 'DE'
        },
        {
          title: 'Italy',
          description: 'IT'
        }
      ]
    }
  }
}
</script>
