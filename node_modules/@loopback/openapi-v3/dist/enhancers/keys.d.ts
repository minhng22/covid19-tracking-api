import { BindingKey } from '@loopback/core';
import { OASEnhancerService } from './spec-enhancer.service';
export declare namespace OASEnhancerBindings {
    /**
     * Strongly-typed binding key for SpecService
     */
    const OAS_ENHANCER_SERVICE: BindingKey<OASEnhancerService>;
    /**
     * Name/id of the OAS enhancer extension point
     */
    const OAS_ENHANCER_EXTENSION_POINT_NAME = "oas-enhancer";
}
