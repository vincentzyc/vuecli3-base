<template>
    <cube-page type="button-view" title="Button">
        <div slot="content">
            <cube-button>Button</cube-button>
            <cube-button type="submit">Submit Button</cube-button>
            <cube-button :active="true">Active Button</cube-button>
            <cube-button :disabled="true">Disabled Button</cube-button>
            <cube-button icon="cubeic-right">Button With Icon</cube-button>
            <cube-button :light="true">Light Button</cube-button>
            <cube-button :inline="true">Inline Button</cube-button>
            <cube-button :outline="true">Outline Button</cube-button>
            <cube-button :primary="true">Primary Button</cube-button>
            <cube-checkbox label="inline">Inline</cube-checkbox>
            <cube-checkbox label="outline">Outline</cube-checkbox>
            <cube-checkbox label="primary">Primary</cube-checkbox>
            <cube-button :inline="inlineStyle" :outline="outlineStyle" :primary="primaryStyle">Demo Button</cube-button>
        </div>
    </cube-page>
</template>

<script type="text/ecmascript-6">
export default {
    data() {
        return {
            buttonStyle: ["inline", "outline", "primary"]
        };
    },
    computed: {
        inlineStyle() {
            return this.buttonStyle.indexOf("inline") >= 0;
        },
        outlineStyle() {
            return this.buttonStyle.indexOf("outline") >= 0;
        },
        primaryStyle() {
            return this.buttonStyle.indexOf("primary") >= 0;
        }
    }
};
</script>
